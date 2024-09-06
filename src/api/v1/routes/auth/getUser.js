import Response from "../../../../utils/espress/response.js";


export default async function getUser(req, res) {
    const user = req.user;
    return Response.OK(res, 200, "User fetched", { user });
}
