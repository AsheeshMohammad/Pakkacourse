import { getSequelize } from '../config/database.js';

export const logUserAccess = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.ip || req.connection.remoteAddress || '';
    const timestamp = new Date();

    const sequelize = getSequelize();
    const query = `
      INSERT INTO PC_tbl_user_access_logs (ip_address, user_agent, access_time)
      VALUES (:ipAddress, :userAgent, :timestamp)
    `;

    await sequelize.query(query, {
      replacements: { ipAddress, userAgent, timestamp },
      type: sequelize.QueryTypes.INSERT
    });

    res.status(200).json({
      success: true,
      message: 'User access logged successfully'
    });
  } catch (error) {
    console.error('Error logging user access:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log user access'
    });
  }
};

export const getUserAccessLogs = async (req, res) => {
  try {
    const sequelize = getSequelize();
    
    // Get total user count
    const totalQuery = `SELECT COUNT(*) as total_users FROM PC_tbl_user_access_logs`;
    const [totalResult] = await sequelize.query(totalQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    
    // Get unique user count by IP
    const uniqueQuery = `SELECT COUNT(DISTINCT ip_address) as unique_users FROM PC_tbl_user_access_logs`;
    const [uniqueResult] = await sequelize.query(uniqueQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    
    // Get recent access logs
    const logsQuery = `
      SELECT id, ip_address, user_agent, access_time
      FROM PC_tbl_user_access_logs
      ORDER BY access_time DESC
      LIMIT 100
    `;
    const logs = await sequelize.query(logsQuery, {
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers: parseInt(totalResult.total_users),
        uniqueUsers: parseInt(uniqueResult.unique_users),
        logs: logs
      }
    });
  } catch (error) {
    console.error('Error fetching user access logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user access logs'
    });
  }
};

