import { ArrowDown01, ArrowUp01 } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { OrderBy } from "@/interfaces"
type Props = {
  orderBy: OrderBy
  setOrderBy: (value: OrderBy) => void
  isDesc: boolean
  setIsDesc: (value: boolean) => void
  options: { label: string; value: OrderBy }[]

}

export function FilterList({
  orderBy,
  setOrderBy,
  isDesc,
  setIsDesc,
  options
}: Props) {


  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar" />

      <Select onValueChange={(value) => setOrderBy(value as OrderBy)}>
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={() => setIsDesc(!isDesc)}>
        {isDesc ? <ArrowDown01 /> : <ArrowUp01 />}
      </Button>
    </div>
  )
}
