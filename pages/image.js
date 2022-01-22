import axios from "axios";
import { useState } from "react";


export default function image()
{
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onChangePicture = e => {
      if (e.target.files[0]) {
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const onUploadPicture = () => {
        let config = {
            headers: {
              'Authorization': 'Bearer 51|7xBvkuiiGH9A1Dl93Jni3Qu3tJfUF8VJz4KYZgkt' 
            },
            onUploadProgress: uploadEvent =>{
                console.log('progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%' );
            }
          }
        const fd = new FormData()
        fd.append('avatar', picture)
        fd.append('steps', 2)
        axios.post('https://api.icoursat.com/api/profiles/step_two', fd, config)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

  return (
      <div>
              <input id="profilePic" type="file" onChange={onChangePicture} />
              <img className="playerProfilePic_home_tile" src={imgData} />
            <button className="submitButton" onClick={onUploadPicture}>Register</button>
      </div>
);
}
