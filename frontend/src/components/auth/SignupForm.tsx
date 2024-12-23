import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { signup } from "../features/auth/signupSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'User',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const dispatch = useDispatch<AppDispatch>();
    const { status, error, message } = useSelector((state: RootState) => state.signup);
    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const isLongEnough = password.length >= 8

        if (!isLongEnough) return "Password must be at least 8 characters long"
        if (!hasUpperCase) return "Password must contain at least one uppercase letter"
        if (!hasLowerCase) return "Password must contain at least one lowercase letter"
        if (!hasNumbers) return "Password must contain at least one number"
        if (!hasSpecialChar) return "Password must contain at least one special character"
        return ""
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        const phoneRegex = /^\+?[\d\s-]{10,}$/
        if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Please enter a valid mobile number"
        }

        const passwordError = validatePassword(formData.password)
        if (passwordError) newErrors.password = passwordError

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                await dispatch(
                    signup({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        role: formData.role,
                        mobileNumber: formData.mobileNumber,
                        password: formData.password,
                    })
                ).unwrap();
                console.log("Sign-up successful");
            } catch (err) {
                console.error("Sign-up failed:", err);
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="mx-auto max-w-md space-y-8 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <p className="text-gray-500">Enter your information to get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            aria-describedby="firstName-error"
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500" id="firstName-error">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            aria-describedby="lastName-error"
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500" id="lastName-error">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500" id="email-error">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="User" onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        aria-describedby="mobileNumber-error"
                    />
                    {errors.mobileNumber && (
                        <p className="text-sm text-red-500" id="mobileNumber-error">
                            {errors.mobileNumber}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            aria-describedby="password-error"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-500" id="password-error">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            aria-describedby="confirmPassword-error"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500" id="confirmPassword-error">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Signing Up..." : "Sign Up"}
                </Button>
                {message && <p className="text-sm text-green-500 text-center mt-2">{message}</p>}
                {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
            </form>
        </div>
    )
}


export default SignupForm