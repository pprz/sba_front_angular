export class ApiResponse {

  status: number;
  msg: string;
  data: {
    result: any
  };
  // data: {result: ''};
  // data: {error: ''};
}


// {
//   "status": 403,
//   "msg": "Forbidden",
//   "data": {
//       "error": "User is disabled"
//   }
// }
