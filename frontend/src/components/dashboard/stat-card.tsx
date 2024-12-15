import { StatCardProps } from "@/types"

export function StatCard({ title, value, icon, iconBgColor = "bg-gray-50 group-hover:bg-gray-100" }: StatCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-200 hover:border-gray-200 w-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className={`p-2.5 rounded-xl ${iconBgColor} 
          transition-colors duration-200`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 tracking-tight">
        {value}
      </div>
    </div>
  )
}