import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Button, Box, Container } from '@mui/material';
import { Edit } from '@mui/icons-material';
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
}

const AdminHome: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    linkname: '',
    link: '',
    linktype: 'social'
  });
  const navigate = useNavigate();

  const linkTypes = ['social', 'resource', 'documentation', 'other'];

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await jwtAxios.get(`${API_ENDPOINTS.LINKS.GET_LIST}?type=all`);
      if (response.data.success) {
        setLinks(response.data.data.links);
      }
    } catch (error) {
      toast.error('Error fetching links');
      console.error('Error fetching links:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await jwtAxios.post(API_ENDPOINTS.LINKS.INSERT_UPDATE, formData);
      if (response.data.success) {
        toast.success(formData.id === 0 ? 'Link added successfully' : 'Link updated successfully');
        setShowModal(false);
        setFormData({ id: 0, linkname: '', link: '', linktype: 'social' });
        fetchLinks();
      }
    } catch (error) {
      toast.error('Error saving link');
      console.error('Error saving link:', error);
    }
  };

  const handleEdit = (link: Link) => {
    setFormData({
      id: link.link_id,
      linkname: link.link_name,
      link: link.link_url,
      linktype: link.linktype
    });
    setShowModal(true);
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
    ],
    [],
  );

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setFormData({ id: 0, linkname: '', link: '', linktype: 'social' });
              setShowModal(true);
            }}
          >
            Add Link
          </Button>
        </div>

        <MaterialReactTable
          columns={columns}
          data={links}
          enableRowActions
          enableResponsiveTable
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
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => handleEdit(row.original)}
                startIcon={<Edit />}
                variant="outlined"
                size="small"
              >
                Edit
              </Button>
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
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </Container>
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