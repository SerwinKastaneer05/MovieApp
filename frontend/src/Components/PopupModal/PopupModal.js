import { useState, useEffect, React } from 'react'
import axios from 'axios';
import './PopupModal.css';


export const PopupModal = ({ setShowPopup, dValue, apikey }) => {
    const [images, setimages] = useState([])
    const [titleDetails, setTitleDetails] = useState([]);
    const [reviews, setReviews]=useState([]);
    const [showReviews, setShowReviews]=useState(false);

    //fetching images of a movie using ID via proxy (Catergory: TITLE API)
    useEffect(() => {
        async function fetchImages() {
       await axios.get(`http://localhost:3001/Images/${apikey}/${dValue.id}/Short`,{
        headers: {
          authorization: ' xxxxxxxxxx' ,
          'Content-Type': 'application/json'
        } 
        }).then((response) => {
            setimages(response.data.items);
           
        })
    }
    fetchImages();
    }, [dValue])

 //fetching details using TITLE  of a movie using ID via proxy (Catergory: TITLE API)
    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:3001/Title/${apikey}/${dValue.id}`,{
                headers: {
                  authorization: ' xxxxxxxxxx' ,
                  'Content-Type': 'application/json'
                } 
                }).then((response) => {
                setTitleDetails(response.data);
               
            })
        }
        fetchData();
      }, [dValue]); 

//fetching METACRITIC REVIEWS of a movie using ID via proxy (Catergory: NEWS -BONUS)
      useEffect(() => {
        async function fetchReviews() {
              await axios.get(`http://localhost:3001/MetacriticReviews/${apikey}/${dValue.id}`,{
        headers: {
          authorization: ' xxxxxxxxxx' ,
          'Content-Type': 'application/json'
        } 
         }).then((response) => {
            setReviews(response.data.items);  
        })
    }
    fetchReviews();
    }, [])


    return (
        <div className='new-question'>

            <div className="new-quesiton-form"  >
                {/* top right cross  */}
                <button id='cross'
                    onClick={() => {
                        setShowPopup(false);
                    }}
                >
                    X
                </button>
                <div className="popup-project_item" onClick={() => { setShowPopup(true) }} >
                    {/* poster image  */}
                    <div className="popup-image_item">
                        <h5>POSTER</h5>
                        <img src={titleDetails.image} height={250} alt="poster" /> 
                    </div>
                    {/* title details which we're getting from TITLE api  */}
                    <div className="details">
                        <div className="detail-rating"> IMDB Rating: <img alt='star' height={20}src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEoElEQVRoge2Z3W8UZRTGf2eWtlBEgtJu+dIQGhED8iEsCbAbqiYSolxqIglcGk0oiNyZGLjwjiuIfwAYb42JIaBeEGMw8YOYFjEkRAhSoFAt0m7blLLv48XutjPb2e7OMqOJ6bnYd949857nOXOeOfPOLszarM1aYqbLHRn92rElSQxLKrB60u2k7DoABa209XfvJYHjJRG0GNneA1oRraXjRCyRCuhqZwvj+RtI6eIXDJBveta29Y3FjZVMBcZH9vnIA7Qxf2JvElCxJyBhyB1ClMgLJEBHpPgrHn8FLnXsQrwAFImXE5FW09v2WtxwCUhIh4uDStPShwDH+3GjxVpS9aTXgnon4/rJQykpb4NtutcTF2a8FZA+AKwkGaaTB1Q4GCdkbBVQT7oddAMxN0AcKuU0jmylbf7zThy48VVA7sA08lLYvdACvBsXbCwV0PfL59E6/geweLpkJj/8iQ3S3PSMrb878rjYkROQMH5rS1PQMpRaClqO2I6013/SFOFqcrLPwF0A+nDuNl7zLbYM3DULnB09AV1qX0UqtQyxAqclYMtRYRnYUmAFUgfQFEpQPuwIPk35JhD9wE2k20K3PNSHszuYu4lL9Vn2wbWqCejy0mPIfRQA8Q01ZNGQT6o4N7RzTflMOmrZ/LHyN3P8CSB3DRDCgqX3B62YhxGs06fo6wTedT/lQBeytf2nkO0HTQQ7SRXy4V2mpk9SdfLV1xVMvGPZodMBzoSYetOvAp8jLQgE8g3/lmRKMUZN3puWGzpTybVqF9IvHVvw3BlE238oGYBBE3ssN3whjOeMbVSX2ldR0DlEZwAkDKi+LhNpHeKGFdhlXcNXqnGs+RzQj20dNHEWaUMAxDfUL5mZ1k1L7LIVCrusa6xvJn41txKWGeinmSzYN4ErVI28zxcqmarrAuS/tfGm7bXIQ4Qnsa52tjD09ymktwIEKgn6iYf46pDhFzYn/7Zto67350hbCQnj4uLjyB0OEPAPjUsGGZ94O/LdZrh6OTW0mdNPi04gOxBTlymSh5OpXL47Kpc5tU8JMZGPUTJlG26ESmMJYFvL4I8jGb/P0NZGmER+oZHwkDYXjxvuMmG+jI5G5xP9jeyHp56X9GQDe5kpn0J9C+h6YnXyCchlJslVfXGvQr7sK88rfU6ZqHQiJ+A8ZWKRTHnuO3blixPBIt/E5iwTucvUcRODMEeyFdB55oLWhUtmmpwGDbrN0Q0MVq8IU9UyXixiJJQALQs2IZqnk/DJSTiJTy3FGsvlT9rO/EnzUp2CE4hHNeTUTGHexuQSIJWZscug84bbmMoN77Pt+cl/ZCz74H5q58hBw1sHnA2XWmnuot0HkRJwlR1oUhZ203D7vWz+ZcuN9FZbb13DV7yu0d0m9iB+nyLPZDJOllwCBpmKqzciZ8fs0dBzlh05PeNif5xXRr+0hWNrTO4QMOSXk1m0Vlr/dvq7hYtk+gtkCCc45anwoeVGH+s3Tp1rXeJSjz422X7AQ8gmxp+217lfz/r6E/gqPV+toxeBfjPviO148HOjpEPjf920WfKOg9L28OFL9gajccaftVn7v9o/fzB7l3fCLDkAAAAASUVORK5CYII=" />
                        <p>{titleDetails.imDbRating}/10</p></div>
                        <p>Title: {titleDetails.fullTitle}</p>
                        <p>Genre: {titleDetails.genres} </p>
                        <p>Runtime: {titleDetails.runtimeStr}</p>
                        <p>Director: {titleDetails.directors}</p>
                        <p>Staring: {titleDetails.stars}</p>
                        <p>Languages: {titleDetails.languages}</p>
        
                      
                    </div>
                </div>

                {showReviews?
                // Show Metacritic Reviews 
                <>
                    <h1>Reviews </h1>
                <div className="review-data">
                    {reviews.map((val, key) => {
                        return <div key={val.id} className="review-container"  >
                            <div className="username-rating">
                         <h5>Author: {val.author}</h5>
                         <h5>Rating: {val.rate}</h5> 
                         </div>
                        <p> <span>Review: </span> {val.content}</p>
                           <br/>
                        </div>
                    })}
                </div>
                   
                <div className="footer">
                    <button className='btn btnFooter'
                        onClick={() => {
                            setShowReviews(false);
                        }}
                        id="footerBTN"
                    >
                       Show Images
                    </button>
                </div>

                </>
                :<>


                  {/* showing images that we fetched from API  */}
                <h1>IMAGES </h1>
                <div className="images-data">
                    {images.map((val, key) => {
                        return <div key={val.id} className="imag-container"  >
                            <img src={val.image} height={200} alt="img" />
                        </div>
                    })}
                </div>

                 {/* cancel button  */}
                 <div className="footer">
                    <button className='btn btnFooter'
                        onClick={() => {
                            setShowReviews(true);
                        }}
                        id="footerBTN"
                    >
                        Show Reviews
                    </button>
                </div>


                </>}
            </div>
        </div>
    )
}

