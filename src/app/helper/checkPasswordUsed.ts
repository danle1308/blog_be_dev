import bcrypt from "bcryptjs";

interface checkPasswordParams {
    password: string;
    arrayPassword: string[];
}

export async function checkPasswordUsed(password: string, arrayPassword: string[]): Promise<boolean> {
    for (let i = 0; i < arrayPassword.length; i++) {
        const isMatch = await bcrypt.compare(password, arrayPassword[i]);
        if (isMatch) {
            console.log("Password already exists!");
            return true;
        }
    }
    return false;
}