const bearerToken = Cypress.env("CYPRESS_BEARER_TOKEN");
let userId; // Store the user ID for reuse

describe("API Automation Tests", () => {
  it("POST - Create a new user", () => {
    // Define the request payload for creating a new user
    const createUserPayload = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2)+'@gmail.net',
      gender: "male",
      status: "inactive",
    };

    // Perform a POST request to create a new user
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: createUserPayload,
    }).then((response) => {
      expect(response.status).to.equal(201);
      userId = response.body.id; // Store the user ID for later use
    });
  });

  it("GET - Get user details", () => {
    // Perform a GET request to retrieve user details using the stored user ID
    cy.request({
      method: "GET",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Add assertions for user details here
    });
  });

  it("PUT - Update user details", () => {
    // Define the request payload for updating user details
    const updateUserPayload = {
      name: Math.random().toString(5).substring(2),
      email: Math.random().toString(5).substring(2)+'@gmail.net',
      gender: "female",
      status: "active",
    };

    // Perform a PUT request to update user details using the stored user ID
    cy.request({
      method: "PUT",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: updateUserPayload,
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Add assertions for the updated user here
    });
  });

  it("DELETE - Delete user", () => {
    // Perform a DELETE request to delete the user using the stored user ID
    cy.request({
      method: "DELETE",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
      // Add assertions for the DELETE operation here
    });
  });

  // Negative test case for POST - Create a new user with missing required fields
  it("POST - Create a new user with missing required fields (Negative Case)", () => {
    // Define the request payload with missing required fields
    const createUserPayload = {
      // Missing "name," "email," "gender," and "status"
    };

    // Perform a POST request to create a new user with missing data
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: createUserPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(422); // Expect a 422 status code for unprocessable entity
      // Add assertions for the error response here
    });
  });

  // Negative test case for GET - Get user details for a non-existing user
  it("GET - Get user details for a non-existing user (Negative Case)", () => {
    // Perform a GET request to retrieve details for a non-existing user
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users/999999", // Use a non-existing user ID
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404); // Expect a 404 status code for not found
      // Add assertions for the error response here
    });
  });

  // Negative test case for PUT - Update user details for a non-existing user
  it("PUT - Update user details for a non-existing user (Negative Case)", () => {
    // Define the request payload for updating user details
    const updateUserPayload = {
      name: "Updated User",
      email: "updated@api.net",
      gender: "female",
      status: "active",
    };

    // Perform a PUT request to update user details for a non-existing user
    cy.request({
      method: "PUT",
      url: "https://gorest.co.in/public/v2/users/999999", // Use a non-existing user ID
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: updateUserPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404); // Expect a 404 status code for not found
      // Add assertions for the error response here
    });
  });

  // Negative test case for DELETE - Delete a non-existing user
  it("DELETE - Delete a non-existing user (Negative Case)", () => {
    // Perform a DELETE request to delete a non-existing user
    cy.request({
      method: "DELETE",
      url: "https://gorest.co.in/public/v2/users/999999", // Use a non-existing user ID
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404); // Expect a 404 status code for not found
      // Add assertions for the error response here
    });
  });


  // END OF TEST

});



