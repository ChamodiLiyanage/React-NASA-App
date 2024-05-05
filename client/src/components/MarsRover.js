import React, { useEffect, useState } from "react";
import { Image, Select } from "antd";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const { Option } = Select;
const apiKey = process.env.REACT_APP_NASA_KEY;

export default function MarsRover() {
  const [photoData, setPhotoData] = useState({ photos: [] });

  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState("FHAZ");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        dispatch(showLoading());
        const res = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPhotoData(data);
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state here
        dispatch(hideLoading());
      }
    };

    fetchPhoto();
  }, [rover, sol, camera, dispatch]);

  const handleRoverChange = (value) => {
    setRover(value);
  };

  const handleSolChange = (value) => {
    setSol(value);
  };

  const handleCameraChange = (value) => {
    setCamera(value);
  };

  if (!photoData || !photoData.photos) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="filter-section row justify-content-center align-items-center mt-5">
        <Select
          defaultValue="curiosity"
          style={{ width: 200 }}
          onChange={handleRoverChange}
        >
          <Option value="curiosity">Curiosity</Option>
          <Option value="spirit">Spirit</Option>
          <Option value="opportunity">Opportunity</Option>
        </Select>
        <Select
          defaultValue={1000}
          style={{ width: 200 }}
          onChange={handleSolChange}
        ></Select>
        <Select
          defaultValue="FHAZ"
          style={{ width: 200 }}
          onChange={handleCameraChange}
        >
          <Option value="FHAZ">Front Hazard Avoidance</Option>
          <Option value="RHAZ">Rear Hazard Avoidance</Option>''
          <Option value="MAST">Mast</Option>
          <Option value="CHEMCAM">Chemistry</Option>
          <Option value="MAHLI">Mars Hand Lens Imager</Option>
          <Option value="MARDI">Mars Descent Imager</Option>
          <Option value="NAVCAM">Navigation</Option>
        </Select>
      </div>
      <div className="mt-5">
        {photoData.photos.map((photo) => (
          <div key={photo.id} className="container-fluid  mx-5 mt-5 ">
            <p>Sol: {photo.sol}</p>
            <p>Earth Date: {photo.earth_date}</p>

            <p>Camera Name: {photo.camera.full_name}</p>
            <p>Rover Name: {photo.rover.name}</p>
            <Image
              src={photo.img_src}
              alt={`Mars Photo ID: ${photo.id}`}
              className="img-fluid"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
