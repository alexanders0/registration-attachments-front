import React from 'react'

const AttachmentContext = React.createContext()

function AttachmentProvider(props) {

  const useStateWithPromise = (initialState) => {
    const [state, setState] = React.useState(initialState);
    const resolverRef = React.useRef(null);
  
    React.useEffect(() => {
      if (resolverRef.current) {
        resolverRef.current(state);
        resolverRef.current = null;
      }
      /**
       * Since a state update could be triggered with the exact same state again,
       * it's not enough to specify state as the only dependency of this useEffect.
       * That's why resolverRef.current is also a dependency, because it will guarantee,
       * that handleSetState was called in previous render
       */
    }, [resolverRef.current, state]);
  
    const handleSetState = React.useCallback((stateAction) => {
      setState(stateAction);
      return new Promise(resolve => {
        resolverRef.current = resolve;
      });
    }, [setState])
  
    return [state, handleSetState];
  };

  const [ studentData, setStudentData ] = React.useState([]);
  /* const [ studentData, setStudentData ] = useStateWithPromise([]); */
  const [ env, setEnv ] = React.useState(null);

  return (
    <AttachmentContext.Provider value={{
      studentData,
      setStudentData,
      env,
      setEnv
    }}>
      {props.children}
    </AttachmentContext.Provider>
  )
}

export { AttachmentContext, AttachmentProvider }
