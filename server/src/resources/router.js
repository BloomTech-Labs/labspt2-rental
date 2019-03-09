import projectRouter from './project/project.router'
import userRouter from './user/user.router'
import taskRouter from './task/task.router'
import propertyRouter from './property/property.router'
import { protect } from '../utils/auth'

export const publicRouter = app => {
  app.use('/api/users', userRouter)
}

export const protectedRouter = app => {
  app.use(protect)
  app.use('/api/projects', projectRouter)
  app.use('/api/tasks', taskRouter)
  app.use('/api/properties', propertyRouter)
}
