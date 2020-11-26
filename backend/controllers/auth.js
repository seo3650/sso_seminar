const jwt = require('jsonwebtoken');
const { jwtSign } = require('../utils/jwt.js');
const client = require('../utils/sso.js');

const authCheck = (req, res) => {
	const jwtSecret = req.app.get('jwt-secret')
	const token = req.headers['x-access-token'] || ''

    if (!token)
        return res.json({ success: false })

	jwt.verify(token.split(' ')[1], jwtSecret, (err, decode) => {
		if (err) {
            return res.json({ success: false });
		}
        res.json({ success: true })
	})
}

const login = (req, res) => {
    const {url, state} = client.getLoginParams()
	req.session.state = state
	res.json({
		url: url
	})
}

const loginCallback = async (req, res) => {
	const {code, state} = req.query
	const stateBefore = req.session.state
	if (stateBefore !== state){
		res.status(401).json({
			error: 'TOKEN MISMATCH: session might be hijacked!',
			status: 401,
		})
		return
	}

	const user = await client.getUserInfo(code)
	const token = jwtSign(user, req.app.get('jwt-secret'))
	
	res.status(200).json({
        token: token,
        sparcs_id: user.sparcs_id,
		status: 200,
	})
}

module.exports = {
	authCheck: authCheck,
	login: login,
	loginCallback: loginCallback
}
