import { NavLink } from "react-router-dom"
import {List, ListItem, ListItemButton, ListItemIcon} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export const SideBar = () => {
  return (
    <>
        {/* <NavLink to="/dashboard">Home</NavLink>
        <br/>
        <NavLink to="/dashboard/add-note/Add">Add Note</NavLink>
        <br/>
        <NavLink to="/dashboard/view-all?type=delete">Delete Note</NavLink>
        <br/>
        <NavLink to="/dashboard/view-all?type=view">View All</NavLink>
        <br/>
        <NavLink to="/dashboard/view-all?type=search">Search Note</NavLink>
        <br/>
        <NavLink to="/dashboard/add-note/Update">Update Note</NavLink>
        <br/> */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard">Home</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard/add-note/Add">Add Note</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon/>
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard/view-all?type=delete">Delete Note</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewListIcon/>
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard/view-all?type=view">View All</NavLink>
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageSearchIcon/>
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard/view-all?type=search">Search Note</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <NavLink style={{textDecoration: 'none'}} to="/dashboard/view-all?type=update">Update Note</NavLink>
            </ListItemButton>
          </ListItem>
          
        </List>
    </>
  )
}
