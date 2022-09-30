import { useState, useEffect, React } from 'react'
import axios from 'axios';
import './watchlist.css'
import { PopupModal } from '../PopupModal/PopupModal';

import { toast } from 'react-toastify';

const Watchlist = ({apikey,email}) => {
    const [DataList, setDataList] = useState([]);
    const[passedValue,setPassedValue]=useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [deleted,setDeleted]=useState("")

    const RemovalNotification = () => {toast.success('Removed from watchlist', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })};
  
// reading data from mongo db 
    useEffect(() => {
      axios.get('http://localhost:3001/read').then((response) => {
        setDataList(response.data);
      })
    }, [deleted])

// removing movie from watchlist 
    const deleteFromWatchlist= (id) => {
      axios.delete(`http://localhost:3001/delete/${id}`, { id: id }).then((response) => {
        setDeleted(id)
        RemovalNotification();
      })
     
    }
  
  return (
    <div className=" watchlist">
       <h3>Your Watchlist</h3>
    <div >
   
   {/* displaying watchlist  */}
      <div className="projects_container">
        {DataList.map((val, key) => { if (val.email===email){
          return <div key={val._id} className="projects-container2"  >
            <div className="project_item"  >
              <div className="project-container-item" onClick={() => { setShowPopup(true); setPassedValue(val) }} >
              <div className="image_item">
                <img src={val.image} alt="project" />
              </div>
              <p>{val.title}</p>
              </div >
              <button id='addtowatchlist' onClick={()=>{deleteFromWatchlist(val._id);setDeleted(val.id);}}> - Remove</button>
              </div>
            
            
            
          </div>}
        })}
         {showPopup? <PopupModal setShowPopup={setShowPopup} dValue={passedValue} apikey={apikey}/>:""}


      </div>


    </div>
  </div>
)
}


export default Watchlist
