import {User} from "../../models/User.model";
import {UserDetails} from "../../models/UserDetails.modal";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URI);
  const data = await req.json();
  const {_id, name, image, ...details} = data;

  let filter = {};
  if (_id) {
    filter = {_id};
  } else {
    console.log("correct it later!")
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, {name, image});
  await UserDetails.findOneAndUpdate({email:user.email}, details, {upsert:true});

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = {_id};
  } 

  const user = await User.findOne(filterUser).lean();
  const doc = await UserDetails.findOne({email:user.email}).lean();

  return Response.json({...user, ...doc});

}
