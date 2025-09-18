"use client"

import { Plus, FileEdit, FolderPlus, Files, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Dashboard() {
  const actions = [
    {
      title: "Add Project",
      description: "Create a new project in your workspace",
      icon: <FolderPlus className="h-8 w-8" />,
      href: "/dashboard/add-project",
      gradient: "from-green-500 to-emerald-700",
      hoverGradient: "from-green-600 to-emerald-800",
    },
    {
      title: "Manage Projects",
      description: "View and edit your existing projects",
      icon: <Files className="h-8 w-8" />,
      href: "/dashboard/manage-projects",
      gradient: "from-blue-500 to-indigo-700",
      hoverGradient: "from-blue-600 to-indigo-800",
    },
    {
      title: "Add Blog",
      description: "Create a new blog post",
      icon: <Plus className="h-8 w-8" />,
      href: "/dashboard/add-blog",
      gradient: "from-purple-500 to-violet-700",
      hoverGradient: "from-purple-600 to-violet-800",
    },
    {
      title: "Manage Blogs",
      description: "View and edit your blog posts",
      icon: <FileEdit className="h-8 w-8" />,
      href: "/dashboard/manage-blogs",
      gradient: "from-amber-500 to-orange-700",
      hoverGradient: "from-amber-600 to-orange-800",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              href={action.href}
              key={action.title}
              className="block h-full transform transition-all duration-300 hover:scale-[1.02]"
            >
              <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
                <div className={`h-2 w-full bg-gradient-to-r ${action.gradient}`}></div>
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient} group-hover:${action.hoverGradient} text-white shadow-md transition-all duration-300`}
                    >
                      {action.icon}
                    </div>
                    <div className="rounded-full bg-gray-100 p-2 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 dark:bg-gray-800">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight">{action.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
