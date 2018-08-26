import React, { Component } from 'react'
import { Spin } from 'antd'

export function withAjaxResource ({
    loadData
}) {
    return Renderer => {
        return class extends Component {
            constructor(props) {
                super(props)

                this.state = {
                    isLoading: true
                }
            }
            componentWillMount = () => {
                loadData(this.props).then(() => {
                    this.setState({ isLoading: false })
                })
            }

            componentWillReceiveProps = nextProps => {
                if(this.props.user._id !== nextProps.user._id)
                    loadData(nextProps).then(() => {
                        this.setState({ isLoading: false })
                    })
            }

            render() {
                if(this.state.isLoading) {
                    return <div className="spinLoader"><Spin /></div>
                }else{
                    return <Renderer 
                        {...this.props}
                        topics={this.props.topics}
                    />
                }
            }
        }
    } 
}