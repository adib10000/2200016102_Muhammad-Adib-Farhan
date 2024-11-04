from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_users(self):
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1
        self.client.get(f"/users/{user_id}")

    @task
    def mengukur_respon_time(self):
        # pengukuran waktu respons mengirimkan request HTTP Get
        response = self.client.get("/")     
        print(f"Response Time: {response.elapsed.total_seconds()} detik")
