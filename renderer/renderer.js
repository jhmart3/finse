import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ipcRenderer } from 'electron';

function App() {
    //const [name, setName] = useState('');
    //const [dob, setDob] = useState('');
    
    // const handleAddUser = () => {
    //     if (name && dob) {
    //         ipcRenderer.send('add-user', { name, dob });
    //     }
    // };
    
    return (
        <h1>Hello, World!</h1>
        // <div>
        //     <h1>Hello, World!</h1>
        //     <div>
        //         <input 
        //             type="text" 
        //             placeholder="Name" 
        //             value={name}
        //             onChange={(e) => setName(e.target.value)}
        //         />
        //         <input 
        //             type="date" 
        //             value={dob}
        //             onChange={(e) => setDob(e.target.value)}
        //         />
        //         <button onClick={handleAddUser}>Add User</button>
        //     </div>
        // </div>
    );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);
