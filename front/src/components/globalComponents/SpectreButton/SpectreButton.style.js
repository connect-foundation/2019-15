import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const leftPadding = '1rem';

const notActive = css`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  :hover,
  :focus {
    color: ${(props) =>
      props.disabled ? props.theme.ecstasy : props.theme.royalBlue};
    background-color: white;
    border-color: ${(props) =>
      props.disabled ? props.theme.ecstasy : props.theme.royalBlue};
  }
`;

export const SpectreButtonStyle = styled.button`
  white-space: nowrap;
  text-align: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${leftPadding};
  border-radius: 4px;
  color: ${(props) => (props.active ? 'white' : 'rgba(0, 0, 0, 0.6)')};
  background-color: ${(props) =>
    props.active ? props.theme.royalBlue : 'white'};
  border-color: ${(props) => props.theme.alto};
  ${(props) => (props.active ? '' : notActive)};
`;

export const SyncIconStyle = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.royalBlue};
`;

export const BanIconStyle = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.ecstasy};
`;
