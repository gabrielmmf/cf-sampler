import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import ConstraintForm from "./components/constraint-form"
import { Constraint } from "./logic/types"
import { ConstraintsTable } from "./components/constraints-table"
import { useState } from "react"



function App() {

  const [constraints, setConstraints] = useState<Constraint[]>([])

  const handleAddConstraint = (constraint: Constraint) => {
    const constraintIndex = constraints.findIndex(c => c.signal === constraint.signal && c.number === constraint.number && c.tag === constraint.tag);

    if (constraintIndex > -1) {
      alert("Essa limitação já existe");
      return;
    }
    setConstraints([...constraints, constraint])
  }

  const handleRemoveConstraint = (constraint: Constraint) => {
    const newConstraints = [...constraints]
    const constraintIndex = constraints.findIndex(c => c.signal === constraint.signal && c.number === constraint.number && c.tag === constraint.tag);

    if (constraintIndex > -1) {
      newConstraints.splice(constraintIndex, 1);
    }
    setConstraints(newConstraints)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute right-2 top-2">
        <ModeToggle ></ModeToggle>
      </div>
      <div className="py-8 flex flex-col justify-center gap-8">
        <ConstraintForm onAddConstraint={handleAddConstraint}></ConstraintForm>
        <ConstraintsTable value={constraints} removeConstraint={constraint => handleRemoveConstraint(constraint)}></ConstraintsTable>
      </div>

    </ThemeProvider>
  )
}

export default App
