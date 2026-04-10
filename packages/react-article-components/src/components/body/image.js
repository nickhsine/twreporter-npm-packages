import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { PillButton } from '@twreporter/react-components/lib/button'
// components
import Img from '../img-with-placeholder'
import Multimedia from './multimedia'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const imgProps = {
  itemProp: 'contentUrl',
}

const Container = Multimedia.Block
const Caption = Multimedia.Caption

const CaptionForTrackingSection = styled(P2)`
  color: ${colorGrayscale.gray700};
  margin-top: 8px;
`

const ImageWrapper = styled.div`
  position: relative;
`

const SensitiveMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colorOpacity['black_0.2']};
  backdrop-filter: blur(80px);
`

const SensitiveMaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  gap: 24px;
  height: 100%;
  width: 100%;
`

const SensitiveMaskText = styled(P1)`
  color: ${colorGrayscale.white};
`

export default function Image({
  className = '',
  data,
  small = false,
  forTrackingSection = false,
}) {
  const [isMaskVisible, setIsMaskVisible] = useState(true)

  const handleMaskClose = useCallback(() => {
    setIsMaskVisible(false)
  }, [])

  const image = _.get(data, ['content', 0])
  const caption = _.get(image, 'description')
  const alt = _.get(image, 'keywords', caption)
  const isSensitive = _.get(image, 'is_sensitive', false)
  const showMask = isSensitive && isMaskVisible
  const appendedClassName = className + ' avoid-break'

  return (
    <Container className={appendedClassName} $small={small}>
      <figure itemScope itemType="http://schema.org/ImageObject">
        <ImageWrapper>
          <Img
            alt={alt}
            imgProps={imgProps}
            imageSet={[image.mobile, image.tablet, image.desktop, image.tiny]}
            defaultImage={image.mobile}
            clickable={!showMask}
            /* TODO: add sizes */
          />
          {showMask ? (
            <SensitiveMask>
              <SensitiveMaskContent>
                <SensitiveMaskText text="本圖恐造成身體不適與恐懼，請斟酌點閱" />
                <PillButton
                  text="顯示照片"
                  theme={PillButton.THEME.transparent}
                  size={PillButton.Size.L}
                  type={PillButton.Type.SECONDARY}
                  onClick={handleMaskClose}
                />
              </SensitiveMaskContent>
            </SensitiveMask>
          ) : null}
        </ImageWrapper>
        {caption ? (
          forTrackingSection ? (
            <CaptionForTrackingSection text={caption} />
          ) : (
            <Caption itemprop="description">{caption}</Caption>
          )
        ) : null}
      </figure>
    </Container>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  data: predefinedPropTypes.elementData.isRequired,
  small: PropTypes.bool,
  forTrackingSection: PropTypes.bool,
}
