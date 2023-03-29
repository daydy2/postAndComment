import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdSettings, MdDriveFileRenameOutline } from "react-icons/md";
import { TbLogin, TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import { FcPicture } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineEyeInvisible , AiOutlineMail} from "react-icons/ai";

export const Dasboard = <RxDashboard size={32} color="#974444" />;
export const Settings = <MdSettings size={32} color="#974444" />;
export const Logout = <TbLogout size={32} />;
export const Login = <TbLogin />;
export const Profile = <CgProfile size={32} color="#974444" />;
export const Follow = <RiUserFollowLine size={16} />;
export const UnFollow = <RiUserUnfollowLine size={16}/>;
export const Comment = <BiComment size={16}/>
export const Picture = <FcPicture size={32}/>
export const Edit = <MdDriveFileRenameOutline size={16}/>
export const User = <AiOutlineUser size={16}/>
export const Lock = <RiLockPasswordLine size={16}/>
export const EyeSlash = <AiOutlineEyeInvisible size={16}/>
export const Mail = <AiOutlineMail size={16}/>
