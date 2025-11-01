import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_BASE_URL || 'https://jobly-backend-t281.onrender.com';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /**company routes */
  /** Get details on a company by handle. */

  static async getCompanyList(name) {
    let res = await this.request(`companies`, { name });
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**job routes */

  static async getJobList(title) {
    let res = await this.request(`jobs`, { title });
    return res.jobs;
  }
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** user routes */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  /** authorization routes */
  static async login(data) {
    const res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  static async applyToJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      'post'
    );
    return res.applied; //backend says it should return {applied: jobId}
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
  'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
  'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
