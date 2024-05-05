import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MarsRover from "./MarsRover";

// Mocking the useDispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("MarsRover Component", () => {
  test("renders without crashing", async () => {
    render(<MarsRover />);
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  test("fetches photos data and displays them", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        photos: [
          {
            id: 1,
            sol: 1000,
            earth_date: "2022-01-01",
            camera: { full_name: "Front Hazard Avoidance" },
            rover: { name: "Curiosity" },
            img_src: "https://example.com/image.jpg",
          },
        ],
      }),
    });

    render(<MarsRover />);

    await waitFor(() => {
      expect(screen.getByText("Sol: 1000")).toBeInTheDocument();
      expect(screen.getByText("Earth Date: 2022-01-01")).toBeInTheDocument();
      expect(
        screen.getByText("Camera Name: Front Hazard Avoidance")
      ).toBeInTheDocument();
      expect(screen.getByText("Rover Name: Curiosity")).toBeInTheDocument();
      expect(screen.getByAltText("Mars Photo ID: 1")).toBeInTheDocument();
    });
  });

  test("allows user to change rover, sol, and camera", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        photos: [],
      }),
    });

    render(<MarsRover />);

    const roverSelect = screen.getByRole("combobox", {
      name: "Rover Selection",
    });
    const solSelect = screen.getByRole("combobox", { name: "Sol Selection" });
    const cameraSelect = screen.getByRole("combobox", {
      name: "Camera Selection",
    });

    userEvent.selectOptions(roverSelect, "spirit");
    userEvent.selectOptions(solSelect, "2000");
    userEvent.selectOptions(cameraSelect, "RHAZ");

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=2000&camera=RHAZ&api_key=your_api_key_here"
      );
    });
  });
});
