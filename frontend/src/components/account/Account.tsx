import { AppDispatch, RootState } from '@/app/store'
import { motion } from 'framer-motion'
import { UserCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchProfile } from '../features/auth/profileSlice'

const Account: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, status, error } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProfile())
    }
  }, [dispatch, status])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    )
  }

  if (status === 'failed') {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 bg-destructive/15">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md mx-auto mt-8 ml-32"
    >
      {user ? (
        <Card>
          <CardHeader>
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <UserCircle className="w-12 h-12 text-primary" />
              <CardTitle>{user.firstName} {user.lastName}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">User ID:</span>
                <span>{user.userId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Role:</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Mobile:</span>
                <span>{user.mobileNumber}</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <p className="text-center py-4">No user information available.</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

export default Account

