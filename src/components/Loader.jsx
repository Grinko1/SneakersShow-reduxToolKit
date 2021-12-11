import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (
  <ContentLoader 
    speed={2}
    width={160}
    height={265}
    viewBox="0 0 200 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="50" y="64" rx="0" ry="0" width="0" height="1" /> 
    <rect x="1" y="8" rx="16" ry="16" width="200" height="155" /> 
    <rect x="12" y="173" rx="10" ry="10" width="178" height="15" /> 
    <rect x="11" y="198" rx="10" ry="10" width="100" height="15" /> 
    <rect x="14" y="231" rx="10" ry="10" width="80" height="24" /> 
    <rect x="152" y="220" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>
)

export default Loader
