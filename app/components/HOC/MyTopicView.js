import React from 'react'
import { connect } from 'react-redux'
import { withAjaxResource } from './withAjaxResource'
import MyList from '../MyList'
import { searchMyTopic } from '../../actions'

const MyTopicView = withAjaxResource({
    loadData(props) {
        return props.searchMyTopic(props.user._id)
    }
})(MyList)



const mapStateToProps = state => {
    return {
        topics: state.editor.get('myTopics'),
        user: state.auth.get('user')
    }
}

export default connect(mapStateToProps, { searchMyTopic })(MyTopicView)