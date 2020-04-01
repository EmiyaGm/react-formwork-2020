import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { LoadableComponent } from 'ConstantComponents'
import intl from 'react-intl-universal'
import axios from 'axios'

import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import message from 'antd/lib/message'
import 'antd/lib/message/style/css'
import ConfigProvider from 'antd/lib/config-provider'
import 'antd/lib/config-provider/style/css'
import antdZhCN from 'antd/es/locale/zh_CN'
import { LoadingOutlined } from '@ant-design/icons'

import 'intl/locale-data/jsonp/zh'
import zhCN from 'Locales/zh-CN.json'

import RootRouter from 'Router/root-router'

import styles from './app.module.css'

const locales = {
  'zh-CN': zhCN,
}

const Login = LoadableComponent({
  loader: () => import('Pages/login'),
  opts: {},
  nextProps: {},
})

const Forgetpassword = LoadableComponent({
  loader: () => import('Pages/forget-password'),
  opts: {},
  nextProps: {},
})

const Signup = LoadableComponent({
  loader: () => import('Pages/sign-up'),
  opts: {},
  nextProps: {},
})

const AppContent = inject('rootStore')(
  observer(props => {
    const routerJump = (pathname, search) => {
      const { history } = props

      history.push({
        pathname,
        search,
      })
    }

    const initLoadLocales = () => {
      const {
        rootStore: { currentLang, setLocalesState },
      } = props

      intl
        .init({
          currentLocale: currentLang,
          locales,
        })
        .then(() => {
          setLocalesState(true)
        })
    }

    const {
      rootStore: {
        getInfoRequesting,
      },
    } = props

    let cancel = () => {}

    useEffect(() => {
      initLoadLocales()

      return cancel
    }, [])

    const tmpMatch = '/'

    return (
      <div className={styles.container}>
        <Spin
          className={styles.spin}
          wrapperClassName={styles.content}
          spinning={getInfoRequesting}
          indicator={<LoadingOutlined spin />}>
          <ConfigProvider locale={antdZhCN}>
            <Switch>
              {/* login  */}
              <Route exact path={`${tmpMatch}login`} component={Login} />
              <Route exact path={`${tmpMatch}forgetpassword`} component={Forgetpassword} />
              <Route exact path={`${tmpMatch}signup`} component={Signup} />

              <Route path={`${tmpMatch}`} component={() => (<RootRouter />)} />
            </Switch>
          </ConfigProvider>
        </Spin>
      </div>
    )
  }),
)

export default withRouter(AppContent)
