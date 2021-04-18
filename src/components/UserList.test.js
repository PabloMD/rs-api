//based on https://kentcdodds.com/blog/stop-mocking-fetch

import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import UserList from "./UserList";

const server = setupServer(
  rest.get(`https://randomuser.me/api/`, (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            gender: "male",
            name: {
              title: "Mr",
              first: "Austin",
              last: "Edwards",
            },
            location: {
              street: {
                number: 4833,
                name: "Aldwins Road",
              },
              city: "Masterton",
              state: "Hawke'S Bay",
              country: "New Zealand",
              postcode: 33891,
              coordinates: {
                latitude: "-24.5684",
                longitude: "-101.3287",
              },
              timezone: {
                offset: "+9:30",
                description: "Adelaide, Darwin",
              },
            },
            email: "austin.edwards@example.com",
            login: {
              uuid: "9c77faeb-71e6-45e8-ae5a-73b310bf1385",
              username: "happyleopard642",
              password: "popcorn",
              salt: "Wl3GuErG",
              md5: "c54da702b8c131f417d4b40659f6343a",
              sha1: "50a749b5ce338f84b2550458d73b7859292a1d0f",
              sha256:
                "0685d0e98565aa4da0f1f284266c2c1379cd9977414319b316662d9c427990f1",
            },
            dob: {
              date: "1961-08-03T17:39:45.747Z",
              age: 60,
            },
            registered: {
              date: "2017-06-27T01:50:45.373Z",
              age: 4,
            },
            phone: "(864)-162-3028",
            cell: "(138)-999-1255",
            id: {
              name: "",
              value: null,
            },
            picture: {
              large: "https://randomuser.me/api/portraits/men/11.jpg",
              medium: "https://randomuser.me/api/portraits/med/men/11.jpg",
              thumbnail: "https://randomuser.me/api/portraits/thumb/men/11.jpg",
            },
            nat: "NZ",
          },
          {
            gender: "female",
            name: {
              title: "Mrs",
              first: "Katie",
              last: "Hall",
            },
            location: {
              street: {
                number: 7727,
                name: "Russell Street",
              },
              city: "Gisborne",
              state: "Waikato",
              country: "New Zealand",
              postcode: 80871,
              coordinates: {
                latitude: "-37.8544",
                longitude: "161.4844",
              },
              timezone: {
                offset: "-3:30",
                description: "Newfoundland",
              },
            },
            email: "katie.hall@example.com",
            login: {
              uuid: "524ee70b-5f48-4451-82cd-b18956d685ac",
              username: "beautifulladybug608",
              password: "aikman",
              salt: "PVDw3aPh",
              md5: "d7ef367fa9539a34df875974cc3dda5f",
              sha1: "b54676a6e6f08f3c85600c9df4b9792c49b56e26",
              sha256:
                "30f5c71e62049bea7a6bb6a3a2446d9d176cbb76272c3d90424c1339226fa353",
            },
            dob: {
              date: "1948-07-19T17:22:46.025Z",
              age: 73,
            },
            registered: {
              date: "2008-12-11T04:34:29.808Z",
              age: 13,
            },
            phone: "(347)-825-5136",
            cell: "(487)-883-3028",
            id: {
              name: "",
              value: null,
            },
            picture: {
              large: "https://randomuser.me/api/portraits/women/10.jpg",
              medium: "https://randomuser.me/api/portraits/med/women/10.jpg",
              thumbnail:
                "https://randomuser.me/api/portraits/thumb/women/10.jpg",
            },
            nat: "NZ",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays users", async () => {
  render(<UserList />);

  await waitFor(() => screen.getAllByRole("link"));

  expect(screen.getAllByText("Name:")).toHaveLength(2);
  screen.getByText("Austin");
});
