import { useState, useEffect, React } from 'react'
import axios from 'axios';
import "./Home.css"
import { PopupModal } from '../PopupModal/PopupModal';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const Home = ({ DataList, setDataList, apikey, email, setadded }) => {

  const [passedValue, setPassedValue] = useState([])
  const [showPopup, setShowPopup] = useState(false);

  const SuccessNotification = () => {
    toast.success('Added to watchlist', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  };

  //fetching Top 250 movies via proxy
  useEffect(() => {
    axios.get(`http://localhost:3001/Top250Movies/${apikey}`, {
      headers: {  //headers for proxy auth.
        authorization: ' xxxxxxxxxx',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setDataList(response.data.items); //assigning the fetched data to DataList array
    });
  }, [apikey]);

  //function to add movie to watchlist
  const addToWatchlist = (val) => {
    //sending data to backend
    const result = axios.post("http://localhost:3001/insert", { id: val.id, title: val.title, image: val.image, email: email }).then((response) => {
      setadded(val.id);
      SuccessNotification()

    })
      .catch((error) => { console.log(error) });

  }



  return (
    <div>
      <div className="projects sectionpadding" id='portfolio'>

        <div className="projects_container">
          {/* display all the fetched movie data using map function */}
          {DataList.map((val, key) => {
            return <div key={val.id} className="projects-container2"  >
              <div className="project_item"  >
                <div className="project-container-item"
                  onClick={() => {
                    setShowPopup(true);
                    setPassedValue(val)
                  }}>
                  <div className="image_item">
                    <img src={val.image} alt="project" />
                  </div>
                  <div className="rating"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEoElEQVRoge2Z3W8UZRTGf2eWtlBEgtJu+dIQGhED8iEsCbAbqiYSolxqIglcGk0oiNyZGLjwjiuIfwAYb42JIaBeEGMw8YOYFjEkRAhSoFAt0m7blLLv48XutjPb2e7OMqOJ6bnYd949857nOXOeOfPOLszarM1aYqbLHRn92rElSQxLKrB60u2k7DoABa209XfvJYHjJRG0GNneA1oRraXjRCyRCuhqZwvj+RtI6eIXDJBveta29Y3FjZVMBcZH9vnIA7Qxf2JvElCxJyBhyB1ClMgLJEBHpPgrHn8FLnXsQrwAFImXE5FW09v2WtxwCUhIh4uDStPShwDH+3GjxVpS9aTXgnon4/rJQykpb4NtutcTF2a8FZA+AKwkGaaTB1Q4GCdkbBVQT7oddAMxN0AcKuU0jmylbf7zThy48VVA7sA08lLYvdACvBsXbCwV0PfL59E6/geweLpkJj/8iQ3S3PSMrb878rjYkROQMH5rS1PQMpRaClqO2I6013/SFOFqcrLPwF0A+nDuNl7zLbYM3DULnB09AV1qX0UqtQyxAqclYMtRYRnYUmAFUgfQFEpQPuwIPk35JhD9wE2k20K3PNSHszuYu4lL9Vn2wbWqCejy0mPIfRQA8Q01ZNGQT6o4N7RzTflMOmrZ/LHyN3P8CSB3DRDCgqX3B62YhxGs06fo6wTedT/lQBeytf2nkO0HTQQ7SRXy4V2mpk9SdfLV1xVMvGPZodMBzoSYetOvAp8jLQgE8g3/lmRKMUZN3puWGzpTybVqF9IvHVvw3BlE238oGYBBE3ssN3whjOeMbVSX2ldR0DlEZwAkDKi+LhNpHeKGFdhlXcNXqnGs+RzQj20dNHEWaUMAxDfUL5mZ1k1L7LIVCrusa6xvJn41txKWGeinmSzYN4ErVI28zxcqmarrAuS/tfGm7bXIQ4Qnsa52tjD09ymktwIEKgn6iYf46pDhFzYn/7Zto67350hbCQnj4uLjyB0OEPAPjUsGGZ94O/LdZrh6OTW0mdNPi04gOxBTlymSh5OpXL47Kpc5tU8JMZGPUTJlG26ESmMJYFvL4I8jGb/P0NZGmER+oZHwkDYXjxvuMmG+jI5G5xP9jeyHp56X9GQDe5kpn0J9C+h6YnXyCchlJslVfXGvQr7sK88rfU6ZqHQiJ+A8ZWKRTHnuO3blixPBIt/E5iwTucvUcRODMEeyFdB55oLWhUtmmpwGDbrN0Q0MVq8IU9UyXixiJJQALQs2IZqnk/DJSTiJTy3FGsvlT9rO/EnzUp2CE4hHNeTUTGHexuQSIJWZscug84bbmMoN77Pt+cl/ZCz74H5q58hBw1sHnA2XWmnuot0HkRJwlR1oUhZ203D7vWz+ZcuN9FZbb13DV7yu0d0m9iB+nyLPZDJOllwCBpmKqzciZ8fs0dBzlh05PeNif5xXRr+0hWNrTO4QMOSXk1m0Vlr/dvq7hYtk+gtkCCc45anwoeVGH+s3Tp1rXeJSjz422X7AQ8gmxp+217lfz/r6E/gqPV+toxeBfjPviO148HOjpEPjf920WfKOg9L28OFL9gajccaftVn7v9o/fzB7l3fCLDkAAAAASUVORK5CYII=" />
                    <p>{val.imDbRating}</p></div>
                  <p>{val.title}</p>
                </div >
                <button id='addtowatchlist'
                  onClick={() => { addToWatchlist(val) }}> + Watchlist</button>
              </div>

            </div>

          })}
          {/* pop up for movie details   */}
          {showPopup ? <PopupModal setShowPopup={setShowPopup} dValue={passedValue} apikey={apikey} /> : ""}
          
        </div>
      </div>
    </div>
  )
}
