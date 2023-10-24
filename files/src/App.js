import './App.css';
import { NoteDashboard } from './modules/notes/pages/NoteDashboard';
import { UserPage } from './modules/user/pages/UserPage';
import {Route, Routes} from 'react-router-dom';
import Add from './modules/notes/components/Add';
import View from './modules/notes/components/View';
import { ErrorBoundary } from './shared/components/errors/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Remember to enable BrowserRouter throughout the application in index.js file  */}
        <Route path='/' element={<UserPage/>}/>
        <Route path='/dashboard' element={<NoteDashboard/>}>
          <Route path='/dashboard/add-note/:operationname' element={<Add/>}/>
          <Route path='/dashboard/view-all' element={<View/>}/>
        </Route>
      </Routes>
    </ErrorBoundary>
    
  );
}

export default App;
