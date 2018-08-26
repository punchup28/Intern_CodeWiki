import React from 'react'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import Immutable from 'immutable'
import CustomCodeBlock from '../blockRender/CustomCodeBlock'

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
        'CustomCodeBlock': {
            element: 'section',
            wrapper: <CustomCodeBlock />
        }
    })
)