import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import ConstraintForm from "./components/constraint-form"
import { Constraint, Problem } from "./logic/types"
import { ConstraintsTable } from "./components/constraints-table"
import { useState } from "react"
import { generateSample } from "./logic/solver"
import ProblemsTable from "./components/problems-table"



function App() {

  const [constraints, setConstraints] = useState<Constraint[]>([])

  const [problems, setProblems] = useState<Problem[]>();

  const handleAddConstraint = (constraint: Constraint) => {
    const constraintIndex = constraints.findIndex(c => c.signal === constraint.signal && c.number === constraint.number && c.tag === constraint.tag);


    if (constraintIndex > -1) {
      alert("Essa limitação já existe");
      return;
    }

    if(constraint.signal === "="){
      if(constraints.find(c => c.tag === constraint.tag)){
        alert("Atenção! Existe uma limitação configurada para essa tag. A limitação atual \"exatamente\" sobrescreverá a anterior")
      }
    }
    setConstraints([constraint, ...constraints])
  }

  const handleRemoveConstraint = (constraint: Constraint) => {
    const newConstraints = [...constraints]
    const constraintIndex = constraints.findIndex(c => c.signal === constraint.signal && c.number === constraint.number && c.tag === constraint.tag);

    if (constraintIndex > -1) {
      newConstraints.splice(constraintIndex, 1);
    }
    setConstraints(newConstraints)
  }

  const handleGenerateSample = (constraints: Constraint[], numberOfQuestions: number) => {
    console.log("setting problems");
    setProblems(generateSample(constraints, numberOfQuestions))
    return;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute right-2 top-2">
        <ModeToggle ></ModeToggle>
      </div>
      <div className="flex flex-row h-screen pr-14">
        <div className="flex flex-col justify-center mx-6 py-2 h-full w-full">
          <div className="h-1/3 overflow-auto">
            <ConstraintForm onAddConstraint={handleAddConstraint}></ConstraintForm>
          </div>
          <div className="h-2/3 flex flex-col items-center justify-between overflow-visible">
            <ConstraintsTable value={constraints} generateSample={handleGenerateSample} removeConstraint={constraint => handleRemoveConstraint(constraint)}></ConstraintsTable>
          </div>

        </div>

        {problems &&
          (
            <div className="flex flex-col justify-center py-2 h-full w-full overflow-auto">
              <ProblemsTable problems={problems} onFinishSampleView={() => setProblems(undefined)}></ProblemsTable>
            </div>
          )
        }


      </div>
    </ThemeProvider>
  )
}

export default App
