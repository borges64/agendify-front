import React from "react";
import { User } from "../../../utils/allInterfaces";
import { div } from "framer-motion/client";

export const UserListItem: React.FC<{ user: User; isExpanded: boolean; onClick: () => void; onEdit: (user: User) => void }> = ({ user, isExpanded, onClick, onEdit }) => {
    return (
        <div className="flex ">

        </div>
    )
}