import { pool } from "../../config/db";
import bcrypt from 'bcryptjs';


const formValidationError = async (payload: any) => {
    const { name, email, password, phone, role } = payload;

    // input field validation
    if (!name || !email || !password || !phone || !role) {
        return "Required fields cannot be empty"
    }

    // password length validation
    if (password.length < 6) {
        return "Password can't be less than 6 characters"
    }

    // Duplicate email validation
    const isExistUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (isExistUser.rowCount) {
        return "User with this email already exist"
    }

    return null;
}

const createUser = async (payload: any) => {
    const { name, email, password, phone, role } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPassword, phone, role]);

    return user.rows[0];
}

const authService = {
    createUser,
    formValidationError,
}

export default authService;