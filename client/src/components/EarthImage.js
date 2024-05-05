import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const apiKey = process.env.REACT_APP_NASA_KEY;
export default function EarthImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchImage();

    async function fetchImage() {
      dispatch(showLoading());
      const res = await fetch(
        `https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=${apiKey}`
      );

      dispatch(hideLoading());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      console.log(imageUrl);
    }
  }, []);

  if (!imageUrl) return <div />;
  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        <img
          src={imageUrl}
          alt="Earth Imagery"
          className=" photo img-fluid"
        ></img>
        <div>
          <h1>Earth Imagery</h1>
          <p className="date">2014-02-01</p>
          <p className="explanation text-justify">
            Earth imagery encompasses a wide array of visual representations
            capturing the Earth's surface from various imaging platforms,
            including satellites, aircraft, and drones. These images offer
            valuable insights into the Earth's intricate landscapes, spanning
            its diverse terrains, oceans, and atmospheric conditions. From
            sprawling cities and dense forests to expansive deserts and towering
            mountain ranges, Earth imagery provides a comprehensive view of our
            planet's rich tapestry of natural and human-made features.
            <br /> <br />
            One of the primary purposes of Earth imagery is environmental
            monitoring, facilitating the observation of changes in land cover,
            deforestation patterns, urban expansion, and other critical
            environmental phenomena. It serves as a vital tool in the study of
            climate change, enabling scientists to track shifts in weather
            patterns, assess the health of ecosystems, and monitor the impacts
            of human activities on the environment. Additionally, Earth imagery
            plays a crucial role in the detection and analysis of natural
            disasters such as wildfires, floods, and hurricanes, aiding in
            disaster preparedness, response, and recovery efforts.
            <br /> <br />
          </p>
        </div>
      </div>
    </>
  );
}
