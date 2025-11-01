import Link from '../models/Link.js';

// Get all links with optional filtering
// const getLinks = async (req, res) => {
//   try {
//     const { type } = req.query;

//     // Call the stored procedure to get dashboard links
//     const { getSequelize } = await import('../config/database.js');
//     const sequelize = getSequelize();
    
//     const links = await sequelize.query(
//       'SELECT * FROM tblpcdashboardlinks WHERE linktype = :type',
//       {
//         replacements: { type: type || 'all' },
//         type: sequelize.QueryTypes.SELECT
//       }
//     );

//     res.status(200).json({
//       success: true,
//       data: {
//         links,
//         pagination: {
//           currentPage: 1,
//           totalPages: 1,
//           totalLinks: links.length,
//           hasNext: false,
//           hasPrev: false
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Get links error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching links'
//     });
//   }
// };
const getLinks = async (req, res) => {
  try {
    const { type } = req.query;

    const { getSequelize } = await import('../config/database.js');
    const sequelize = getSequelize();

    // 1. CORRECTED SQL: Use SELECT * FROM and double-quotes for the function name
    const links = await sequelize.query(
      'SELECT * FROM "PC_GetDashboardLinks"(:type)',
      {
        replacements: { type: type || 'all' },
        type: sequelize.QueryTypes.SELECT // Returns an array of objects (rows)
      }
    );

    // 2. FIX: Use the 'links' array directly, as it's already an array of link objects
    const finalLinks = links; 

    res.status(200).json({
      success: true,
      data: {
        links: finalLinks, // Pass the array directly
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalLinks: finalLinks.length,
          hasNext: false,
          hasPrev: false
        }
      }
    });
  } catch (error) {
    // 3. IMPORTANT: The 500 error is likely reported here
    console.error('Get links error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching links'
    });
  }
};
// Insert or update a single link
const insertOrUpdateLink = async (req, res) => {
  try {
    const { id, linkname, link, linktype } = req.body;

    // Validate required fields
    if (linkname === undefined || link === undefined || linktype === undefined || id === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: id, linkname, link, and linktype'
      });
    }

    if (!linkname || !link || !linktype) {
      return res.status(400).json({
        success: false,
        message: 'Linkname, link, and linktype cannot be empty'
      });
    }

    // Get database connection
    const { getSequelize } = await import('../config/database.js');
    const sequelize = getSequelize();

    // Determine operation based on ID value
    // id = 0 means INSERT, id > 0 means UPDATE
    const operation = (id === 0 || id === '0') ? 'I' : 'U';
    const linkId = parseInt(id);

    // Call the stored procedure
    await sequelize.query(
      'CALL "PC_DashboardLinks_InsertDelete"(:operation, :id, :linkname, :link, :linktype)',
      {
        replacements: {
          operation,
          id: linkId,
          linkname,
          link,
          linktype
        },
        type: sequelize.QueryTypes.RAW
      }
    );

    res.status(200).json({
      success: true,
      message: operation === 'I' ? 'Link created successfully' : 'Link updated successfully',
      data: {
        action: operation === 'I' ? 'created' : 'updated',
        link: {
          id: linkId,
          linkname,
          link,
          linktype
        }
      }
    });
  } catch (error) {
    console.error('Insert/Update link error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const incrementClicks = async (req, res) => {
    const { linkId } = req.body; 

    if (!linkId) {
        return res.status(400).json({ success: false, message: 'Link ID is required.' });
    }

    try {
        const { getSequelize } = await import('../config/database.js');
        const sequelize = getSequelize();

        // 🛑 CHANGE: Use 'CALL' instead of 'SELECT' to execute the Procedure.
        await sequelize.query(
            'CALL "PC_IncrementLinkClicks_P"(:linkId)', 
            {
                replacements: { linkId: linkId },
                // Type is often set to RAW or omitted for CALL statements 
                // as they don't return a standard result set.
            }
        );

        res.status(200).json({
            success: true,
            message: `Clicks successfully incremented for Link ID: ${linkId}`
        });
    } catch (error) {
        console.error('Increment clicks error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while incrementing clicks.'
        });
    }
};

// ... export the incrementClicks function
// Delete a link
const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Link ID is required for deletion'
      });
    }

    // Get database connection
    const { getSequelize } = await import('../config/database.js');
    const sequelize = getSequelize();

    // Call the stored procedure for delete
    await sequelize.query(
      'CALL "PC_DashboardLinks_InsertDelete"(:operation, :id, null, null, null)',
      {
        replacements: {
          operation: 'D',
          id: parseInt(id)
        },
        type: sequelize.QueryTypes.RAW
      }
    );

    res.status(200).json({
      success: true,
      message: 'Link deleted successfully'
    });
  } catch (error) {
    console.error('Delete link error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting link'
    });
  }
};

export {
  getLinks,
  insertOrUpdateLink,
  deleteLink,
  incrementClicks
};
