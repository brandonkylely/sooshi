import "./Loading.css"

function Loading() {
  return (
    <div className="lds-roller w-20 h-20 mx-auto my-40" data-testid="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
}

export default Loading;