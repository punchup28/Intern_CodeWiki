import React from 'react'
import { withAjaxResource } from './withAjaxResource'
import List from '../List'
import { connect } from 'react-redux'
import { getAllEditorData } from '../../actions'

const AllTopicView = withAjaxResource({
    loadData(props) {
        return props.getAllEditorData()
    } 
})(List)

const mapStateToProps = state => {
    return {
        topics: state.editor.get('allTopic'),
        user: state.auth.get('user')
    }
}

export default connect(mapStateToProps, { getAllEditorData })(AllTopicView)