import mongoose from "mongoose";
import { Board } from "../models/Board.js";
import { useConvertType } from "./useConvertType.js";
import { ROLE } from "../constants/role.js";

export async function useCheckRole(boardId: string, userId: string) {
    const normalizedUserId = useConvertType(userId)
    const normalizedBoardId = useConvertType(boardId)
    try {
        const board = await Board.findById(
            normalizedBoardId
        )
        if (!board) {
            console.error('Board not found');
            return {
                isAdmin: false,
                isMember: false,
                isWatcher: false,
            };
        }
        const member = board.members.find(model =>
            model.user.equals(normalizedUserId)
        )
        if (!member) {
            return {
                isAdmin: false,
                isMember: false,
                isWatcher: false,
            };
        }
        const role = member.role;
        return {
            isAdmin: role === ROLE.ADMIN,
            isMember: role === ROLE.MEMBER,
            isWatcher: role === ROLE.WATCHER,
        };
    } catch (err) {
        console.error("useCheckRole error:", err);
        return {
            isAdmin: false,
            isMember: false,
            isWatcher: false,
        };
    }
}