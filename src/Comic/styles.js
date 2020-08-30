import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: unset;
  }
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & button {
    margin-top: 12px;
  }
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
`

export const Thumbnail = styled.img``

export const Title = styled.span`
  font-size: 18px;
  margin-left: 8px;
`

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImageSection = styled.div`
  margin-top: 8px;
  width: 168px;
  height: 252px;
`

export const ImagePlaceholder = styled.div`
  background: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 14px;
`

export const Image = styled.img``

export const Authors = styled.div`
  margin-top: 8px;
  font-size: 14px;
`
