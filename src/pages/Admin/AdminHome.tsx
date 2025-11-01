import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Button, Box, Container, Modal, Typography, CircularProgress, Backdrop, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtAxios } from '../../utils/axios';
import { API_ENDPOINTS } from '../../utils/endpoints';
import Header from '../../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import './AdminHome.css';

interface Link {
  link_id: number;
  link_name: string;
  link_url: string;
  linktype: string;
  clicks: string;
  displayorder: number;
}

interface UserAccessLog {
  id: number;
  ip_address: string;
  user_agent: string;
  access_time: string;
}

const AdminHome: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [userStats, setUserStats] = useState({ totalUsers: 0, uniqueUsers: 0 });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, linkId: 0, linkName: '' });
  const [formData, setFormData] = useState({
    id: 0,
    linkname: '',
    link: '',
    linktype: 'social',
    displayorder: ''
  });
  const navigate = useNavigate();

  const linkTypes = ['social', 'resource', 'documentation', 'other'];

  useEffect(() => {
    fetchLinks();
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await jwtAxios.get(API_ENDPOINTS.LOGS.GET_ACCESS);
      if (response.data.success) {
        setUserStats({
          totalUsers: response.data.data.totalUsers,
          uniqueUsers: response.data.data.uniqueUsers
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await jwtAxios.get(`${API_ENDPOINTS.LINKS.GET_LIST}?type=all`);
      if (response.data.success) {
        setLinks(response.data.data.links);
      }
    } catch (error) {
      toast.error('Error fetching links');
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await jwtAxios.post(API_ENDPOINTS.LINKS.INSERT_UPDATE, formData);
      if (response.data.success) {
        toast.success(formData.id === 0 ? 'Link added successfully' : 'Link updated successfully');
        setShowModal(false);
        setFormData({ id: 0, linkname: '', link: '', linktype: 'social', displayorder: '' });
        fetchLinks();
      }
    } catch (error) {
      toast.error('Error saving link');
      console.error('Error saving link:', error);
      setLoading(false);
    }
  };

  const handleEdit = (link: Link) => {
    setFormData({
      id: link.link_id,
      linkname: link.link_name,
      link: link.link_url,
      linktype: link.linktype,
      displayorder: link.displayorder?.toString() || ''
    });
    setShowModal(true);
  };

  const handleDelete = (link: Link) => {
    setDeleteModal({ open: true, linkId: link.link_id, linkName: link.link_name });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const response = await jwtAxios.delete(`${API_ENDPOINTS.LINKS.DELETE}/${deleteModal.linkId}`);
      if (response.data.success) {
        toast.success('Link deleted successfully');
        fetchLinks();
      }
    } catch (error) {
      toast.error('Error deleting link');
      console.error('Error deleting link:', error);
      setLoading(false);
    }
    setDeleteModal({ open: false, linkId: 0, linkName: '' });
  };

  const columns = useMemo<MRT_ColumnDef<Link>[]>(
    () => [
      {
        accessorKey: 'link_id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'link_name',
        header: 'Name',
      },
      {
        accessorKey: 'link_url',
        header: 'Link',
      },
      {
        accessorKey: 'linktype',
        header: 'Type',
        size: 120,
      },
      {
        accessorKey: 'clicks',
        header: 'Clicks',
        size: 100,
      },
      {
        accessorKey: 'displayorder',
        header: 'Order',
        size: 80,
      },
    ],
    [],
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 2 }}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h4" color="primary">{userStats.totalUsers}</Typography>
              <Typography variant="body2">Total Visits</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h4" color="primary">{userStats.uniqueUsers}</Typography>
              <Typography variant="body2">Unique Users</Typography>
            </Box>
          </Box>
         <div> <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setFormData({ id: 0, linkname: '', link: '', linktype: 'social', displayorder: '' });
              setShowModal(true);
            }}
          >
            Add Link
          </Button></div>
        </div>

        <MaterialReactTable
          columns={columns}
          data={links}
          enableRowActions
          enableResponsiveTable
          enableTopToolbar={false}
          muiTableContainerProps={{
            sx: {
              minHeight: '500px',
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontSize: '14px',
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              fontSize: '14px',
              fontWeight: 'bold',
            },
          }}
          muiBottomToolbarProps={{
            sx: {
              fontSize: '12px',
              '& .MuiInputLabel-root,.MuiInputBase-input, option,span': {
                fontSize: '12px',
              },
              '& .MuiTablePagination-selectLabel': {
                fontSize: '12px',
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: '12px',
              },
              '& .MuiBox-root': {
                display: 'flex',
              },
            },
          }}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Tooltip title="Edit">
                <Edit
                  onClick={() => handleEdit(row.original)}
                  fontSize="small"
                  sx={{ 
                    color: '#1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#1565c0'
                    }
                  }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Delete
                  onClick={() => handleDelete(row.original)}
                  fontSize="small"
                  sx={{ 
                    color: '#d32f2f',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#c62828'
                    }
                  }}
                />
              </Tooltip>
            </Box>
          )}
        />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{formData.id === 0 ? 'Add Link' : 'Edit Link'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Link Name</label>
                <input
                  type="text"
                  value={formData.linkname}
                  onChange={(e) => setFormData({...formData, linkname: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Link URL</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Link Type</label>
                <select
                  value={formData.linktype}
                  onChange={(e) => setFormData({...formData, linktype: e.target.value})}
                >
                  {linkTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.displayorder}
                  onChange={(e) => setFormData({...formData, displayorder: e.target.value})}
                  placeholder="Leave empty for auto-order"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, linkId: 0, linkName: '' })}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete "{deleteModal.linkName}"? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => setDeleteModal({ open: false, linkId: 0, linkName: '' })}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      </Container>
      
      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AdminHome;