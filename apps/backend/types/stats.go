package types

type APIStats struct {
	APIID           string  `json:"api_id"`
	Name            string  `json:"name"`
	TestCasesCount  int     `json:"test_cases_count"`
	TestRunsCount   int     `json:"test_runs_count"`
	PassedTestRuns  int     `json:"passed_test_runs"`
	FailedTestRuns  int     `json:"failed_test_runs"`
	SuccessRate     float64 `json:"success_rate"`     // in percentage
	AverageDuration float64 `json:"average_duration"` // in seconds
	TotalDuration   float64 `json:"-"`                // temporary field for calculation
}

type StatsResponse struct {
	UserID          string     `json:"user_id"`
	TotalAPIs       int        `json:"total_apis"`
	TotalTestCases  int        `json:"total_test_cases"`
	TotalTestRuns   int        `json:"total_test_runs"`
	PassedTestRuns  int        `json:"passed_test_runs"`
	FailedTestRuns  int        `json:"failed_test_runs"`
	SuccessRate     float64    `json:"success_rate"`     // overall pass rate in percentage
	AverageDuration float64    `json:"average_duration"` // overall average duration in seconds
	APIStats        []APIStats `json:"api_stats"`
}
