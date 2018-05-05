import React from 'react';
import { bool, node } from 'prop-types';
import Container from './container';
import Header from './header';

const Layout = ({
  backgroundWaves = false,
  container = false,
  header = false,
  children,
}) => {
  return (
    <div>
      {backgroundWaves && (
        <div
          style={{
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSIgdmlld0JveD0nMCAwIDE0NDAgNzY1JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxkZWZzPgogICAgICAgIDxyYWRpYWxHcmFkaWVudCBjeD0iMTAwJSIgY3k9IjY1Ljg0Mzc0MTclIiBmeD0iMTAwJSIgZnk9IjY1Ljg0Mzc0MTclIiByPSIxMDcuNDg5Mzc2JSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwwLjY1ODQzNyksc2NhbGUoMC41MzEwMDUsMS4wMDAwMDApLHJvdGF0ZSgxNTcuNjU5MjY3KSx0cmFuc2xhdGUoLTEuMDAwMDAwLC0wLjY1ODQzNykiIGlkPSJyYWRpYWxHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0QzNTJGRiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQTBENkZGIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgICAgIDxyYWRpYWxHcmFkaWVudCBjeD0iMTAwJSIgY3k9IjY1Ljg0Mzc0MTclIiBmeD0iMTAwJSIgZnk9IjY1Ljg0Mzc0MTclIiByPSIxMDcuNDg5Mzc2JSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwwLjY1ODQzNyksc2NhbGUoMC41MTU4NzgsMS4wMDAwMDApLHJvdGF0ZSgxNTguMjM1NDg5KSx0cmFuc2xhdGUoLTEuMDAwMDAwLC0wLjY1ODQzNykiIGlkPSJyYWRpYWxHcmFkaWVudC0yIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzkyM0JGRiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjVBOUY3IiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgICAgIDxyYWRpYWxHcmFkaWVudCBjeD0iNDQuMTM2NjY3OCUiIGN5PSI2NC44MjgyNDkzJSIgZng9IjQ0LjEzNjY2NzglIiBmeT0iNjQuODI4MjQ5MyUiIHI9Ijk0LjE0ODgwOTElIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNDQxMzY3LDAuNjQ4MjgyKSxzY2FsZSgwLjUwMDM0NywxLjAwMDAwMCkscm90YXRlKC0xMy43NjkyNTIpLHRyYW5zbGF0ZSgtMC40NDEzNjcsLTAuNjQ4MjgyKSIgaWQ9InJhZGlhbEdyYWRpZW50LTMiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNTI2MEZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM0OTBGQTEiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iRGVza3RvcC0wMi1Db3B5LTE5IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iYmciPgogICAgICAgICAgICA8cGF0aCBkPSJNMCwwIEwxNDQwLDAgTDE0NDAsNjkxLjYzNzczOCBDMTM0Ny40NDU2MSw3MTQuMDg3OTI0IDEyNDAuMzgzMTksNzM0Ljk4NTkyOSAxMTE4LjgxMjc0LDc1NC4zMzE3NTMgQzkxMS43NTE3NDgsNzg3LjI4MTkxMyA4NTEuMTg0NjU4LDczMi4yMjQ2NjEgNTQ0LjA4NDUzMSw3MTUuNTcyNDA5IEMzNjEuMTkyMzIsNzA1LjY1NTIyOSAxNzkuODMwODEsNzE1Ljc5Nzc1OSAwLDc0NiBMMCwwIFoiIGlkPSJSZWN0YW5nbGUtMTAtQ29weS0yIiBmaWxsPSJ1cmwoI3JhZGlhbEdyYWRpZW50LTEpIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDE0NDAsMCBMMTQ0MCw2NzkuNDU5NjgyIEMxMzE0LjM3MDQxLDcwNy4wMTI0OTUgMTE4OC4xMDMyOSw3MjYuNzI0NDc5IDEwNjEuMTk4NjYsNzM4LjU5NTYzMyBDODY1Ljg5NTEzOCw3NTYuODY1MDg3IDc3NS4xODQ4ODQsNzExLjI1MzcwNCA1MzUuNjUwMTM0LDcwMC4yODM0MjIgQzQzMC44MjI1MzMsNjk1LjQ4MjQ5NyAyNTIuMjcyNDg5LDY5NC4yNTAxNzggMCw2OTYuNTg2NDY0IEwwLDAgWiIgaWQ9IlJlY3RhbmdsZS0xMC1Db3B5LTQiIGZpbGw9InVybCgjcmFkaWFsR3JhZGllbnQtMikiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTQ0MCwwIEwxNDQwLDY2NC4yNTQwNSBDMTM0NC4xMzM4NSw2ODMuMTE5MjI3IDEyMzQuMjY0MDQsNjk4LjkzMzc2OCAxMTEwLjM5MDU3LDcxMS42OTc2NzUgQzg1Mi41Njg4MDksNzM4LjI2MzU5NyA4MTcuMDQ1NTkzLDY5Ny40MDk5MyA0OTQuOTM4MDY5LDY4NC44MTI3NDggQzI3NC43MzU3NjEsNjc2LjIwMDk0IDEwOS43NTY0MDUsNjYyLjcyNDkxIDAsNjQ0LjM4NDY1OSBMMCwwIFoiIGlkPSJSZWN0YW5nbGUtMTAiIGZpbGw9InVybCgjcmFkaWFsR3JhZGllbnQtMykiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionY: 'bottom',
            height: 400,
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -50,
          }}
        />
      )}

      {header && (
        <Header />
      )}

      {container
        ? <Container>{children}</Container>
        : children
      }
    </div>
  );
};

Layout.propTypes = {
  backgroundWaves: bool,
  container: bool,
  children: node,
  header: bool,
};

export default Layout;
