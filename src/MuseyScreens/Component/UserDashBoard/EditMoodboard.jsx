import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../../Style.css";
import { useNavigate } from "react-router";
import ImageRequestBoard from "./ImageRequestBoard";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function EditMoodboard() {
  const [dataMood, setDataMood] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = "https://www.musey.ai/api/static/moodimages/";
  const imageSize = { width: "300px", height: "300px", margin: "10px" };
  const marginData = {};
  const isPromptsButtonDisabled = inputValue.length === 0;

  console.log("asdadaasdasdsadsadsdsd",dataMood)

  const handleRenderClick = () => {
    setIsLoading(true);
    const dataImage = localStorage.getItem("UserId");
    const userRole = localStorage.getItem("UserRole");
    const MoodID = dataMood.moodboard_id;
    const promtValue = inputValue;
    let imagesData = dataMood.images

    const combinedData = {
      userid: Number(dataImage),
      moodid: Number(MoodID),
      userrole: userRole,
      prompt: promtValue,
      images: Array.isArray(imagesData) ? imagesData : [],
    };
    console.log("combinedData",combinedData)

    const BASE_URL = "https://musey.ai/api";
    const url = `${BASE_URL}/renderimages/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === "success") {
          setIsLoading(false);
          localStorage.setItem('showing', false);
          navigate("/addimage", {
            state: {
              renderdimages: data.generatedimages,
              imageObject: data.imageswithobjects,
            },
          });
        } else {
          setIsLoading(false);
          NotificationManager.error(data.error, "", 2000);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    const storedMoodboardString = localStorage.getItem("MoodBoardData");
    if (storedMoodboardString) {
      const storedMoodboard = JSON.parse(storedMoodboardString);
      setDataMood(storedMoodboard);
    }
  }, []);


  return (
    <div style={{ marginBottom: "6rem" }}>
      {isLoading ? (
        <ImageRequestBoard />
      ) : (
        <Container className="mt-5">
          <Row className="mt-5">
            <Col md={12} style={marginData} className="mt-5">
              {/* Image Section */}
              <Row className="mb-5">
                {dataMood.images &&
                  dataMood.images.map((image, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                      <img
                        src={baseUrl + image.image_url}
                        alt={`Image ${index}`}
                        className="img-fluid imageSize"
                        style={{ objectFit: "cover" }}
                      />
                    </Col>
                  ))}
              </Row>
              <br />
              <br />
              {/* Image Section */}
              <Form.Group className="mx-auto mt- vision-bar generaterbimg1 generaterbimgresults">
                <img src="assests/MLogoIcon.png" alt="" />
                <Form.Control
                  type="text"
                  placeholder="Enter Prompt text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ border: "none", boxShadow: "none", padding: "10px" }}
                />
                <Button
                  style={{
                    backgroundColor: "#2afdfd",
                    color: "black",
                    border: "none",
                  }}
                  className="btn btn-secondary border border-0"
                  onClick={handleRenderClick}
                  disabled={isPromptsButtonDisabled}
                >
                  <b>Generate</b>
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      )}
      <NotificationContainer />
    </div>
  );
}

export default EditMoodboard;
