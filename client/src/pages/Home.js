import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const getData = async () => {
    try {
      const response = await axios.post(
        "https://react-nasa-app.onrender.com/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="home">
      <div>
        <div>
          <nav
            className="navbar fixed-top navbar-dark bg-dark d-flex justify-content-between"
            style={{ height: "60px" }}
          >
            <span className="navbar-brand mb-0 h1 px-3">NASA APP</span>
            <div className="d-flex align-items-center">
              <Link to="/" className="anchor">
                {user?.name}
              </Link>
              <i
                className="ri-logout-box-r-line ml-2 px-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </nav>

          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              style={{
                marginRight: "7rem",
                marginLeft: "4rem",
                marginTop: "2rem",
              }}
            >
              <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
                <img
                  src="../images/img5.jpg"
                  alt="astronomy picture of the day"
                  height="200px"
                  className="img-fluid"
                />
                <h3 className="text-md text-secondary font-bold pt-2 ">APOD</h3>
                <p>
                  Each day, a new image or photograph related to astronomy,
                  along with a brief explanation written by a professional
                  astronomer.
                </p>

                <Link className="home-link" to="/nasaphoto">
                  Explore more
                </Link>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              style={{ marginRight: "7rem", marginTop: "2rem" }}
            >
              <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
                <img
                  src="../images/img2.jpg"
                  alt="mars rover"
                  height="200px"
                  className="img-fluid"
                />
                <h3 className="text-md text-secondary font-bold pt-2">
                  Mars Rover Pictures
                </h3>
                <p>
                  Image data gathered by NASA's Curiosity, Opportunity, and
                  Spirit rovers on Mars.Each rover has its own set of photos
                  stored in the database, which can be queried separately.
                </p>
                <Link className="home-link" to="/marsrover">
                  Explore more
                </Link>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              style={{ marginTop: "2rem" }}
            >
              <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
                <img
                  src="../images/img3.jpg"
                  alt="earth imagery"
                  height="200px"
                  className="img-fluid"
                />
                <h3 className="text-md text-secondary font-bold pt-2">Earth</h3>
                <p>
                  Earth imagery encompasses a wide array of visual
                  representations capturing the Earth's surface from various
                  imaging platforms, including satellites, aircraft, and drones.{" "}
                </p>

                <Link className="home-link" to="/earthimage">
                  Explore more
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
