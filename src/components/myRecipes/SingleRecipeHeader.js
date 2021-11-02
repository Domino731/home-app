import { connect } from "react-redux"

const SingleRecipeHeader = ({recipeStyles}) => {
   const styles = {
       backgroundColor: recipeStyles.color
   }
   return <header className="recipeHeader" style={styles}>
         <span className="recipeHeader__border" style={styles}/>
         <div className="recipeHeader__icon" dangerouslySetInnerHTML={{ __html: recipeStyles.icon }}></div>
         <button className="recipeHeader__btn" style={styles}>Dodaj do listy zadań</button>
   </header>
}
const mapStateToProps = state => ({
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeHeader)