import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const CreateProject = () => {

  const history = useHistory()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [goalAmount, setGoalAmount] = useState()
  const [minPledge, setMinPledge] = useState()

  const postProject = async (e) => {
    e.preventDefault()
    console.log('hello')
  }

  const updateName = (e) => {
    setName(e.target.value)
  }

  const updateDescription = (e) => {
    setDescription(e.target.value)
  }
  const updateGoalAmount = (e) => {
    setGoalAmount(e.target.value)
  }
  const updateMinPledge = (e) => {
    setMinPledge(e.target.value)
  }

  return (
    <>
      <h1>Tell Your Story</h1>
      <form onSubmit={postProject}>
        <div>

          <input
            type='text'
            name='name'
            placeholder="Name of Project"
            onChange={updateName}
          ></input>
        </div>
        <div>
          <textarea
            type='text'
            name='description'
            placeholder="Description of Project"
            onChange={updateDescription}
          ></textarea>
        </div>
        <div>

          <input
            type='number'
            name='goal'
            placeholder="Goal Amount"
            onChange={updateGoalAmount}
          ></input>
        </div>
        <div>
          <input
            type='number'
            name='minimum'
            placeholder="Minimum Pledge Amount"
            onChange={updateMinPledge}
          ></input>
        </div>
        <button type="submit">Create</button>
        <button type="submit" onClick={() => history.push("/")}>Cancel</button>
      </form>
    </>
  )
}

export default CreateProject;
