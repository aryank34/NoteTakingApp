import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { oAuthWithGoogle } from '../repository/oauth';
import { useNavigate } from 'react-router-dom';

export const OAuth = () => {
    const navigate = useNavigate(); //it does programmatic redirection to other pages, we can also pass objects
    const googleAuth = async () => {
        try{    
            const user = await oAuthWithGoogle();

            if(user){
                navigate('/dashboard',{state:{'username':user.displayName}}); //pass the path of the component to which you want to navigate
                //console.log('User info is ',user);
            }else{
                console.log('Some Problem in User Fetch');
            }
        }catch(err){
            console.log('Some Problem in User Fetch',err);
        }
    }

    return (<Button onClick={googleAuth} variant="contained"><LoginIcon/>&nbsp;Login with Google</Button>);
}