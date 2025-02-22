"use client";

import { ApiTestInfo } from "@/components/api-test-info";
import { useState, useEffect } from "react";

export default function ApiTestInfoPage({
  params,
}: {
  params: { api: string };
}) {
  const apiId = params.api;
  const [apiTestData, setApiTestData] = useState(null);

  async function getApiTestData(apiId: string) {
    try {
      const response = await fetch(`/api/execute/cases?api_id=${apiId}`);
      const apiTestData = await response.json();
      return apiTestData;
    } catch (error) {
      console.error("Error fetching API test data:", error);
      return null;
    }
  }

  useEffect(() => {
    getApiTestData(apiId).then((data) => setApiTestData(data));
  }, [apiId]);

  

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8">
        {apiTestData && <ApiTestInfo apiInfo={apiTestData} />}
      </main>
    </div>
  );
}

//   api_id: "674af5c4eb10b74f40d901bf",
//   test_cases: 24,
//   test_results: [
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c1",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.502Z",
//         description: "Successful request with valid data",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Happy Path - Basic",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975a",
//         duration: 0.5519223213195801,
//         executed_at: "2024-12-01T11:21:53Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c1",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.502Z",
//           description: "Successful request with valid data",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Happy Path - Basic",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c1",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c2",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.688Z",
//         description: "Request with missing required fields",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Negative - Missing Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975b",
//         duration: 1.1430978775024414,
//         executed_at: "2024-12-01T11:21:53Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c2",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.688Z",
//           description: "Request with missing required fields",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Negative - Missing Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c2",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c3",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.885Z",
//         description: "Request with invalid data types",
//         expectedoutcome: 422,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Negative - Invalid Data Types",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975c",
//         duration: 1.0968654155731201,
//         executed_at: "2024-12-01T11:21:55Z",
//         expected_outcome: 422,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c3",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.885Z",
//           description: "Request with invalid data types",
//           expectedoutcome: 422,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Negative - Invalid Data Types",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c3",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c4",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.068Z",
//         description: "Request with invalid authorization",
//         expectedoutcome: 401,
//         headers: '{"Authorization":"Invalid Token"}',
//         method: "GET",
//         name: "GET Negative - Unauthorized",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975d",
//         duration: 1.7345318794250488,
//         executed_at: "2024-12-01T11:21:56Z",
//         expected_outcome: 401,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c4",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.068Z",
//           description: "Request with invalid authorization",
//           expectedoutcome: 401,
//           headers: '{"Authorization":"Invalid Token"}',
//           method: "GET",
//           name: "GET Negative - Unauthorized",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c4",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c5",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.262Z",
//         description: "Request with maximum allowed payload size",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Edge - Maximum Payload",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975e",
//         duration: 0.6156823635101318,
//         executed_at: "2024-12-01T11:21:57Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c5",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.262Z",
//           description: "Request with maximum allowed payload size",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Edge - Maximum Payload",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c5",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c6",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.447Z",
//         description: "Request with minimum required fields",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Edge - Minimum Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674c46db8a8dc5d11571975f",
//         duration: 0.6194906234741211,
//         executed_at: "2024-12-01T11:21:58Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c6",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.447Z",
//           description: "Request with minimum required fields",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Edge - Minimum Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c6",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c1",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.502Z",
//         description: "Successful request with valid data",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Happy Path - Basic",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f62",
//         duration: 0.5517921447753906,
//         executed_at: "2024-12-01T18:09:13Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c1",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.502Z",
//           description: "Successful request with valid data",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Happy Path - Basic",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c1",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c2",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.688Z",
//         description: "Request with missing required fields",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Negative - Missing Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f63",
//         duration: 1.0710017681121826,
//         executed_at: "2024-12-01T18:09:14Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c2",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.688Z",
//           description: "Request with missing required fields",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Negative - Missing Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c2",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5fdeb10b74f40d901c3",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:45.885Z",
//         description: "Request with invalid data types",
//         expectedoutcome: 422,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Negative - Invalid Data Types",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f64",
//         duration: 2.0371041297912598,
//         executed_at: "2024-12-01T18:09:15Z",
//         expected_outcome: 422,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5fdeb10b74f40d901c3",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:45.885Z",
//           description: "Request with invalid data types",
//           expectedoutcome: 422,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Negative - Invalid Data Types",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5fdeb10b74f40d901c3",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c4",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.068Z",
//         description: "Request with invalid authorization",
//         expectedoutcome: 401,
//         headers: '{"Authorization":"Invalid Token"}',
//         method: "GET",
//         name: "GET Negative - Unauthorized",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f65",
//         duration: 0.4891023635864258,
//         executed_at: "2024-12-01T18:09:17Z",
//         expected_outcome: 401,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c4",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.068Z",
//           description: "Request with invalid authorization",
//           expectedoutcome: 401,
//           headers: '{"Authorization":"Invalid Token"}',
//           method: "GET",
//           name: "GET Negative - Unauthorized",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c4",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c5",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.262Z",
//         description: "Request with maximum allowed payload size",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Edge - Maximum Payload",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f66",
//         duration: 0.7024648189544678,
//         executed_at: "2024-12-01T18:09:18Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c5",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.262Z",
//           description: "Request with maximum allowed payload size",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Edge - Maximum Payload",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c5",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674af5feeb10b74f40d901c6",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-11-30T11:24:46.447Z",
//         description: "Request with minimum required fields",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Edge - Minimum Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f67",
//         duration: 0.4797649383544922,
//         executed_at: "2024-12-01T18:09:18Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674af5feeb10b74f40d901c6",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-11-30T11:24:46.447Z",
//           description: "Request with minimum required fields",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Edge - Minimum Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674af5feeb10b74f40d901c6",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca517304c31c5029b2f56",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:07.119Z",
//         description: "Successful request with valid data",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//         method: "GET",
//         name: "GET Happy Path - Basic",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f68",
//         duration: 0.6839625835418701,
//         executed_at: "2024-12-01T18:09:19Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca517304c31c5029b2f56",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:07.119Z",
//           description: "Successful request with valid data",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123"}',
//           method: "GET",
//           name: "GET Happy Path - Basic",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca517304c31c5029b2f56",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca517304c31c5029b2f57",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:07.308Z",
//         description: "Successful request with additional optional headers",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Happy Path - Optional Headers",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f69",
//         duration: 0.47319817543029785,
//         executed_at: "2024-12-01T18:09:19Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca517304c31c5029b2f57",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:07.308Z",
//           description: "Successful request with additional optional headers",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Happy Path - Optional Headers",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca517304c31c5029b2f57",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca517304c31c5029b2f58",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:07.487Z",
//         description: "Successful request with query parameters",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Happy Path - Query Parameters",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1?key=value&key2=value2",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6a",
//         duration: 0.7486236095428467,
//         executed_at: "2024-12-01T18:09:20Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca517304c31c5029b2f58",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:07.487Z",
//           description: "Successful request with query parameters",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Happy Path - Query Parameters",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1?key=value&key2=value2",
//         },
//         test_case_id: "674ca517304c31c5029b2f58",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca518304c31c5029b2f59",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:08.091Z",
//         description: "Request with missing required fields",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Negative - Missing Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6b",
//         duration: 0.4838995933532715,
//         executed_at: "2024-12-01T18:09:21Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca518304c31c5029b2f59",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:08.091Z",
//           description: "Request with missing required fields",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Negative - Missing Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca518304c31c5029b2f59",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca518304c31c5029b2f5a",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:08.278Z",
//         description: "Request with invalid data types",
//         expectedoutcome: 422,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Negative - Invalid Data Types",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6c",
//         duration: 0.48253655433654785,
//         executed_at: "2024-12-01T18:09:21Z",
//         expected_outcome: 422,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca518304c31c5029b2f5a",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:08.278Z",
//           description: "Request with invalid data types",
//           expectedoutcome: 422,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Negative - Invalid Data Types",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca518304c31c5029b2f5a",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca518304c31c5029b2f5b",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:08.457Z",
//         description: "Request with invalid authorization",
//         expectedoutcome: 401,
//         headers: '{"Authorization":"Invalid Token"}',
//         method: "GET",
//         name: "GET Negative - Unauthorized",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6d",
//         duration: 0.5074007511138916,
//         executed_at: "2024-12-01T18:09:22Z",
//         expected_outcome: 401,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca518304c31c5029b2f5b",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:08.457Z",
//           description: "Request with invalid authorization",
//           expectedoutcome: 401,
//           headers: '{"Authorization":"Invalid Token"}',
//           method: "GET",
//           name: "GET Negative - Unauthorized",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca518304c31c5029b2f5b",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca518304c31c5029b2f5c",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:08.637Z",
//         description: "Request with invalid URL path",
//         expectedoutcome: 404,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Negative - Invalid URL",
//         payload: "null",
//         url: "https://jsonplaceholder.typicode.com/posts/1/non-existent-path",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6e",
//         duration: 0.7582917213439941,
//         executed_at: "2024-12-01T18:09:22Z",
//         expected_outcome: 404,
//         response: "{}",
//         status_code: 404,
//         test_case: {
//           _id: "674ca518304c31c5029b2f5c",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:08.637Z",
//           description: "Request with invalid URL path",
//           expectedoutcome: 404,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Negative - Invalid URL",
//           payload: "null",
//           url: "https://jsonplaceholder.typicode.com/posts/1/non-existent-path",
//         },
//         test_case_id: "674ca518304c31c5029b2f5c",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca518304c31c5029b2f5d",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:08.821Z",
//         description: "Request with empty payload",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Negative - Empty Payload",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f6f",
//         duration: 1.0209918022155762,
//         executed_at: "2024-12-01T18:09:23Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca518304c31c5029b2f5d",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:08.821Z",
//           description: "Request with empty payload",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Negative - Empty Payload",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca518304c31c5029b2f5d",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca519304c31c5029b2f5e",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:09.004Z",
//         description: "Request with maximum allowed payload size",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Edge - Maximum Payload",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f70",
//         duration: 0.6866974830627441,
//         executed_at: "2024-12-01T18:09:24Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca519304c31c5029b2f5e",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:09.004Z",
//           description: "Request with maximum allowed payload size",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Edge - Maximum Payload",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca519304c31c5029b2f5e",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca519304c31c5029b2f5f",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:09.19Z",
//         description: "Request with minimum required fields",
//         expectedoutcome: 200,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Edge - Minimum Fields",
//         payload: "{}",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f71",
//         duration: 0.5067009925842285,
//         executed_at: "2024-12-01T18:09:25Z",
//         expected_outcome: 200,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca519304c31c5029b2f5f",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:09.19Z",
//           description: "Request with minimum required fields",
//           expectedoutcome: 200,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Edge - Minimum Fields",
//           payload: "{}",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca519304c31c5029b2f5f",
//         test_result: true,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca519304c31c5029b2f60",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:09.374Z",
//         description: "Request with unexpected fields in payload",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Edge - Unexpected Fields",
//         payload:
//           '{"nestedUnexpectedField":{"nestedKey":"nestedUnexpectedValue"},"unexpectedField1":"unexpectedValue1","unexpectedField2":12345,"unexpectedField3":true}',
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f72",
//         duration: 2.473982095718384,
//         executed_at: "2024-12-01T18:09:25Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca519304c31c5029b2f60",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:09.374Z",
//           description: "Request with unexpected fields in payload",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Edge - Unexpected Fields",
//           payload:
//             '{"nestedUnexpectedField":{"nestedKey":"nestedUnexpectedValue"},"unexpectedField1":"unexpectedValue1","unexpectedField2":12345,"unexpectedField3":true}',
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca519304c31c5029b2f60",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//     {
//       test_case: {
//         _id: "674ca519304c31c5029b2f61",
//         apiid: "674af5c4eb10b74f40d901bf",
//         createdat: "2024-12-01T18:04:09.558Z",
//         description: "Request with special characters in payload",
//         expectedoutcome: 400,
//         headers:
//           '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//         method: "GET",
//         name: "GET Edge - Special Characters",
//         payload: '{"!@#$%^&*()<>?{}[]|":"valueWithSpecialChars"}',
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//       },
//       test_results_data: {
//         _id: "674ca65d304c31c5029b2f73",
//         duration: 0.7320311069488525,
//         executed_at: "2024-12-01T18:09:28Z",
//         expected_outcome: 400,
//         response:
//           '{\n  "userId": 1,\n  "id": 1,\n  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n}',
//         status_code: 200,
//         test_case: {
//           _id: "674ca519304c31c5029b2f61",
//           apiid: "674af5c4eb10b74f40d901bf",
//           createdat: "2024-12-01T18:04:09.558Z",
//           description: "Request with special characters in payload",
//           expectedoutcome: 400,
//           headers:
//             '{"Accept":"application/json","Authorization":"Bearer exampleToken123","Cache-Control":"no-cache","Content-Language":"en-US","X-Correlation-ID":"test-correlation-id-12345","X-Request-ID":"unique-request-id-67890"}',
//           method: "GET",
//           name: "GET Edge - Special Characters",
//           payload: '{"!@#$%^&*()<>?{}[]|":"valueWithSpecialChars"}',
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//         },
//         test_case_id: "674ca519304c31c5029b2f61",
//         test_result: false,
//         user_api: {
//           _id: "674af5c4eb10b74f40d901bf",
//           created_at: "2024-11-30T11:23:48.773Z",
//           description:
//             "This API retrieves the details of a specific post by ID. The ID of the post is passed as a part of the URL path.",
//           headers:
//             '{"Authorization": "Bearer exampleToken123", "Accept": "application/json"}',
//           method: "GET",
//           name: "Fetch Post Details API",
//           payload: "",
//           updated_at: "2024-11-30T11:23:48.773Z",
//           url: "https://jsonplaceholder.typicode.com/posts/1",
//           user_id: "66d5ba3f255ac668fe885432",
//         },
//       },
//     },
//   ],
// };
